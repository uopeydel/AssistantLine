using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.RegularExpressions;

namespace Service.Line.ErrorException
{

        public class SaveNotCompleteException : Exception
        {
            public object saveObj { get; set; }
            public SaveNotCompleteException(object obj, string message)
                : base(message)
            {
                saveObj = obj;
            }

            public SaveNotCompleteException(object obj, string message, params object[] args)
                : base(string.Format(message, args))
            {
                saveObj = obj;
            }

            public SaveNotCompleteException(object obj, string message, Exception ex)
                : base(message, ex)
            {
                saveObj = obj;
            }

            public SaveNotCompleteException(object obj, Exception ex)
                : base("Some complement obj is not save see in Innerexception", ex)
            {
                saveObj = obj;
            }

        }

        public class CacheServiceException : Exception
        {
            public CacheServiceException(string message)
                : base(message)
            { }

            public CacheServiceException(string message, params object[] args)
                : base(string.Format(message, args))
            { }
        }

        public class NotFoundReferenceDocNotExistException : Exception
        {

            public NotFoundReferenceDocNotExistException(string message)
                : base(message)
            { }

            public NotFoundReferenceDocNotExistException(string message, params object[] args)
                : base(string.Format(message, args))
            { }

            public NotFoundReferenceDocNotExistException(string message, Exception ex)
                : base(message, ex)
            {
            }
        }

        public class PeriodLockException : Exception
        {

            public PeriodLockException(string message)
                : base(message)
            { }

            public PeriodLockException(string message, params object[] args)
                : base(string.Format(message, args))
            { }

            public PeriodLockException(string message, Exception ex)
                : base(message, ex)
            {
            }
        }

        public class NotFoundCondtionException : Exception
        {

            public NotFoundCondtionException(string message)
                : base(message)
            { }

            public NotFoundCondtionException(string message, params object[] args)
                : base(string.Format(message, args))
            { }

            public NotFoundCondtionException(string message, Exception ex)
                : base(message, ex)
            {
            }
        }

        public class PreConditionException : Exception
        {

            public PreConditionException(string message)
                : base(message)
            { }

            public PreConditionException(string message, params object[] args)
                : base(string.Format(message, args))
            { }

            public PreConditionException(string message, Exception ex)
                : base(message, ex)
            {
            }
        }

        public class ValidateServiceException : Exception
        {

            public ValidateServiceException(string message)
                : base(message)
            { }

            public ValidateServiceException(string message, params object[] args)
                : base(string.Format(message, args))
            { }

            public ValidateServiceException(string message, Exception ex)
                : base(message, ex)
            {
            }
        }

        public class ImportExcelException : Exception
        {
            public ImportExcelException(string message)
                : base(message)
            { }

            public ImportExcelException(string message, params object[] args)
                : base(string.Format(message, args))
            { }

            public ImportExcelException(string message, Exception ex)
                : base(message, ex)
            {
            }

            public ImportExcelException(string message, Exception ex, params object[] args)
                : base(string.Format(message, args), ex)
            {
            }
        }

        public class NotEnoughQtyException : Exception
        {
            public NotEnoughQtyException(string message)
                : base(message)
            { }

            public NotEnoughQtyException(string message, params object[] args)
                : base(string.Format(message, args))
            { }
        }

        public class NotEnoughRemainAmountException : Exception
        {
            public NotEnoughRemainAmountException(string message)
                : base(message)
            { }

            public NotEnoughRemainAmountException(string message, params object[] args)
                : base(string.Format(message, args))
            { }
        }

        public class DataValidateException : Exception
        {

            public DataValidateException(string message)
                : base(message)
            { }

            public DataValidateException(string message, params object[] args)
                : base(string.Format(message, args))
            { }

            public DataValidateException(ValidationExceptionCollection excoll)
                : base(excoll.ToString())
            { }
        }

        public class SaveServiceException : Exception
        {
            public SaveServiceException(string message)
                : base(message)
            { }

            public SaveServiceException(string message, params object[] args)
                : base(string.Format(message, args))
            { }
        }

        public class DeleteServiceException : Exception
        {
            public DeleteServiceException(string message)
                : base(message)
            { }

            public DeleteServiceException(string message, params object[] args)
                : base(string.Format(message, args))
            { }
        }

        public class UnitCoversionException : Exception
        {
            public UnitCoversionException(string message)
                : base(message)
            { }

            public UnitCoversionException(string message, params object[] args)
                : base(string.Format(message, args))
            {


            }
        }

        public class UnsupportedMediaTypeException : Exception
        {
            public UnsupportedMediaTypeException(string message)
                : base(message)
            { }

            public UnsupportedMediaTypeException(string message, params object[] args)
                : base(string.Format(message, args))
            {


            }
        }

        public class ValidationExceptionCollection : List<Exception>
        {

            public override string ToString()
            {
                var msg = "";
                foreach (var item in this)
                {
                    msg += item.Message + '\n';
                }

                return msg;
            }


        }

        public class DeadDuplicateCodeException : Exception
        {
            public DeadDuplicateCodeException(string message)
                : base(message)
            { }

            public DeadDuplicateCodeException(string message, params object[] args)
                : base(string.Format(message, args))
            {


            }
        }

        public class RunningCodeException : Exception
        {
            public RunningCodeException(string message)
                : base(message)
            { }

            public RunningCodeException(string message, params object[] args)
                : base(string.Format(message, args))
            {


            }
        }

        public class SqlConnectionStringErrorException : Exception
        {
            public SqlConnectionStringErrorException(string message)
                : base(message)
            { }

            public SqlConnectionStringErrorException(string message, params object[] args)
                : base(string.Format(message, args))
            { }
        }

        public class TestException
        {
            static Regex dupReg = new Regex(@"The duplicate key value is \((?<code>.+)\)");
            public static Boolean IsDuplicateCode(Exception e, ref int count, int limit)
            {
                var in1 = e.InnerException;
                if (in1 != null && in1.InnerException != null)
                {
                    var in2 = in1.InnerException;
                    if (in2 != null && dupReg.IsMatch(in2.Message))
                    {
                        var match = dupReg.Match(in2.Message);
                        var code = match.Groups["code"].Value;
                        if (count > limit)
                        {
                            throw new DeadDuplicateCodeException("Dead Duplicate Code Exception on Code {0}", code);
                        }
                        count++;
                        return true;
                    }
                }
                return false;
            }

            public static void IsDuplicateCode(Exception e)
            {
                var in1 = e.InnerException;
                if (in1 != null && in1.InnerException != null)
                {
                    var in2 = in1.InnerException;
                    if (in2 != null && dupReg.IsMatch(in2.Message))
                    {
                        var match = dupReg.Match(in2.Message);
                        var code = match.Groups["code"].Value;
                        throw new DeadDuplicateCodeException("Dead Duplicate Code Exception on Code {0}", code);
                    }
                }
                throw e;
            }

        }

}
